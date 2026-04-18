import json
from pathlib import Path

from schemas import UserProfile
from ai_service import analyze_project, generate_invite_message
from matching import collaborator_score, explain_match
from request_service import send_collaboration_request

BASE_DIR = Path(__file__).resolve().parent
USERS_FILE = BASE_DIR / "data" / "mock_users.json"


def load_mock_users():
    with open(USERS_FILE, "r", encoding="utf-8") as f:
        users = json.load(f)
    return [UserProfile(**user) for user in users]


def run_collaboration_agent(project_text: str, founder_id: str, project_id: str):
    analysis = analyze_project(project_text)
    users = load_mock_users()

    ranked = []

    for user in users:
        if user.id == founder_id or not user.available:
            continue

        score = collaborator_score(analysis, user)
        reasons = explain_match(analysis, user)

        ranked.append({
            "user": user,
            "score": score,
            "reasons": reasons
        })

    ranked.sort(key=lambda item: item["score"], reverse=True)
    top_matches = ranked[:5]

    sent_requests = []

    for match in top_matches:
        invite = generate_invite_message(analysis, match["user"].model_dump())

        saved_request = send_collaboration_request(
            sender_id=founder_id,
            recipient_id=match["user"].id,
            project_id=project_id,
            invite=invite
        )

        sent_requests.append({
            "userId": match["user"].id,
            "name": match["user"].name,
            "role": match["user"].role,
            "score": round(match["score"], 3),
            "reasons": match["reasons"],
            "subject": saved_request.subject,
            "message": saved_request.message,
            "status": saved_request.status
        })

    return {
        "analysis": analysis.model_dump(),
        "matches": sent_requests
    }