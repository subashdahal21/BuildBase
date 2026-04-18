from pydantic import BaseModel, Field
from typing import List, Literal


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
