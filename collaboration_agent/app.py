from fastapi import FastAPI
from schemas import ProjectRequest, ProjectTextRequest
from agent_runner import get_collab_matches, send_collaboration_request, get_incoming_collaboration_requests
from schemas import InvestorRequest, CollaborationRequest, InviteMessage
from investor_agent import run_investor_agent
from ai_service import analyze_project

app = FastAPI(title="ConnectPro Collaboration Agent")


@app.get("/")
def root():
    return {"message": "Collaboration agent is running"}



@app.post("/run-investor-agent")
def run_investor(request: InvestorRequest):
    return run_investor_agent(request.investorText)

@app.post("/projects/analyze")
def analyze_project_endpoint(payload: ProjectTextRequest):
    analysis = analyze_project(payload.projectText)
    return analysis.model_dump()

@app.post("/projects/search-collaborators")
def search_collaborators(payload: ProjectRequest):
    return get_collab_matches(
        payload.projectText,
        payload.founderId,
        payload.projectId
    )


@app.post("/collaboration-requests")
def create_collaboration_request(payload: CollaborationRequest):
    invite = InviteMessage(
        subject=payload.subject,
        message=payload.message
    )

    saved_request = send_collaboration_request(
        sender_id=payload.senderId,
        recipient_id=payload.recipientId,
        project_id=payload.projectId,
        invite=invite
    )

    return saved_request.model_dump()


@app.get("/users/{user_id}/collaboration-requests")
def get_user_collaboration_requests(user_id: str):
    requests = get_incoming_collaboration_requests(user_id)
    return {
        "userId": user_id,
        "requests": requests
    }

