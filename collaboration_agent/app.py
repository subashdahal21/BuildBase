from fastapi import FastAPI
from schemas import ProjectRequest
from agent_runner import run_collaboration_agent
from schemas import InvestorRequest
from investor_agent import run_investor_agent

app = FastAPI(title="ConnectPro Collaboration Agent")


@app.get("/")
def root():
    return {"message": "Collaboration agent is running"}


@app.post("/run-agent")
def run_agent(request: ProjectRequest):
    return run_collaboration_agent(
        project_text=request.projectText,
        founder_id=request.founderId,
        project_id=request.projectId
    )

@app.post("/run-investor-agent")
def run_investor(request: InvestorRequest):
    return run_investor_agent(request.investorText)