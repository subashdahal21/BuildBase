import requests

from ai_service import analyze_project, generate_invite_message
from request_service import send_collaboration_request

BACKEND_BASE_URL = "http://localhost:3000"


def fetch_candidate_users_from_backend(
    founder_id: str,
    project_id: str,
    required_roles: list[str],
    required_skills: list[str]
):
    payload = {
        "founderId": founder_id,
        "projectId": project_id,
        "requiredRoles": required_roles,
        "requiredSkills": required_skills
    }

    response = requests.post(
        f"{BACKEND_BASE_URL}/api/match",
        json=payload,
        timeout=15
    )
    response.raise_for_status()

    data = response.json()
    print("BACKEND RESPONSE:", data)
    return data.get("matches", [])


def run_collaboration_agent(project_text: str, founder_id: str, project_id: str):
    analysis = analyze_project(project_text)

    backend_matches = fetch_candidate_users_from_backend(
        founder_id=founder_id,
        project_id=project_id,
        required_roles=analysis.requiredRoles,
        required_skills=analysis.requiredSkills
    )

    top_matches = backend_matches[:5]
    sent_requests = []

    for match in top_matches:
        invite = generate_invite_message(analysis, match)

        saved_request = send_collaboration_request(
            sender_id=founder_id,
            recipient_id=match["id"],
            project_id=project_id,
            invite=invite
        )

        reasons = []

        if match.get("roleMatch"):
            reasons.append("Role matched project needs")

        if match.get("skills"):
            reasons.append(f"Relevant skills: {', '.join(match['skills'][:3])}")

        if match.get("interests"):
            reasons.append(f"Shared interests: {', '.join(match['interests'][:2])}")

        sent_requests.append({
            "userId": match["id"],
            "name": match["name"],
            "role": match.get("role"),
            "score": match.get("score"),
            "reasons": reasons,
            "subject": saved_request.subject,
            "message": saved_request.message,
            "status": saved_request.status
        })

    return {
        "analysis": analysis.model_dump(),
        "matches": sent_requests
    }