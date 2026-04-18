import requests

from ai_service import analyze_project, generate_invite_message
from request_service import send_collaboration_request
from typing import Dict, List
from schemas import CollaborationRequest, InviteMessage

BACKEND_BASE_URL = "http://localhost:3000"

ROLE_MAP = {
    "backend developer": "Backend Engineer",
    "backend engineer": "Backend Engineer",
    "full stack developer": "Full Stack Engineer",
    "frontend developer": "Frontend Engineer",
    "ml engineer": "ML Engineer",
    "data scientist": "ML Engineer"
}

def normalize_roles(roles: list[str]) -> list[str]:
    normalized = []
    for r in roles:
        key = r.lower().strip()
        normalized.append(ROLE_MAP.get(key, r))
    return list(set(normalized))

SKILL_MAP = {
    "ai development": ["Python", "PyTorch", "TensorFlow", "LLM"],
    "web development": ["React", "Next.js", "Node.js"],
    "data analysis": ["Pandas", "NumPy", "SQL"],
    "machine learning": ["Python", "Scikit-learn", "PyTorch"],
    "frontend": ["React", "Tailwind", "TypeScript"],
    "backend": ["FastAPI", "Node.js", "PostgreSQL"]
}

def normalize_skills(skills: list[str]) -> list[str]:
    expanded = []
    for s in skills:
        key = s.lower().strip()
        if key in SKILL_MAP:
            expanded.extend(SKILL_MAP[key])
        else:
            expanded.append(s)
    return list(set(expanded))

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
    normalized_roles = normalize_roles(analysis.requiredRoles)
    normalized_skills = normalize_skills(analysis.requiredSkills)

    backend_matches = fetch_candidate_users_from_backend(
    founder_id=founder_id,
    project_id=project_id,
    required_roles=normalized_roles,
    required_skills=normalized_skills
)

    top_matches = backend_matches[:7]
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
        "subject": invite.subject,
        "message": invite.message
    })

    return {
        "analysis": analysis.model_dump(),
        "matches": sent_requests
    }

def get_collab_matches(project_text: str, founder_id: str, project_id: str):
    analysis = analyze_project(project_text)
    normalized_roles = normalize_roles(analysis.requiredRoles)
    normalized_skills = normalize_skills(analysis.requiredSkills)

    backend_matches = fetch_candidate_users_from_backend(
        founder_id=founder_id,
        project_id=project_id,
        required_roles=normalized_roles,
        required_skills=normalized_skills
    )

    top_matches = backend_matches[:5]
    matches = []

    for match in top_matches:
        invite = generate_invite_message(analysis, match)

        reasons = []

        if match.get("roleMatch"):
            reasons.append("Role matched project needs")

        if match.get("skills"):
            reasons.append(f"Relevant skills: {', '.join(match['skills'][:3])}")

        if match.get("interests"):
            reasons.append(f"Shared interests: {', '.join(match['interests'][:2])}")

        matches.append({
            "userId": match["id"],
            "name": match["name"],
            "role": match.get("role"),
            "score": match.get("score"),
            "reasons": reasons,
            "subject": invite.subject,
            "message": invite.message
        })

    return {
        "analysis": analysis.model_dump(),
        "matches": matches
    }

collaboration_requests_store: List[CollaborationRequest] = []

def send_collaboration_request(
    sender_id: str,
    recipient_id: str,
    project_id: str,
    invite: InviteMessage
) -> CollaborationRequest:
    new_request = CollaborationRequest(
        senderId=sender_id,
        recipientId=recipient_id,
        projectId=project_id,
        subject=invite.subject,
        message=invite.message,
        status="pending"
    )

    collaboration_requests_store.append(new_request)
    return new_request


def get_incoming_collaboration_requests(user_id: str) -> list[dict]:
    return [
        request.model_dump()
        for request in collaboration_requests_store
        if request.recipientId == user_id
    ]