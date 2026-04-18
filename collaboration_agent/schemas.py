from pydantic import BaseModel, Field
from typing import List, Literal

 
class ProjectTextRequest(BaseModel):
    projectText: str = Field(..., min_length=10)

class ProjectRequest(BaseModel):
    projectText: str = Field(..., min_length=10)
    founderId: str
    projectId: str


class ProjectAnalysis(BaseModel):
    projectType: str
    summary: str
    targetUsers: List[str]
    requiredRoles: List[str]
    requiredSkills: List[str]
    businessNeeds: List[str]
    investorTags: List[str]
    projectStage: str


class UserProfile(BaseModel):
    id: str
    name: str
    role: str
    skills: List[str]
    interests: List[str]
    experienceLevel: str
    available: bool


class InviteMessage(BaseModel):
    subject: str
    message: str


class CollaborationRequest(BaseModel):
    senderId: str
    recipientId: str
    projectId: str
    subject: str
    message: str
    status: Literal["pending", "accepted", "rejected"] = "pending"


class RankedMatch(BaseModel):
    userId: str
    name: str
    role: str
    score: float
    reasons: List[str]
    subject: str
    message: str
    status: str


class InvestorRequest(BaseModel):
    investorText: str


class InvestorAnalysis(BaseModel):
    preferredSectors: List[str]
    preferredStages: List[str]
    preferredTechnologies: List[str]
    targetMarkets: List[str]
    riskAppetite: str
    investmentStyle: str


class ProjectProfile(BaseModel):
    id: str
    title: str
    summary: str
    domainTags: List[str]
    projectStage: str
    targetUsers: List[str]
    technologies: List[str]
    teamRolesFilled: List[str]
    requiredRoles: List[str]
    lookingForFunding: bool


class InvestorProjectMatch(BaseModel):
    projectId: str
    title: str
    score: float
    reasons: List[str]
    investmentNote: str