from schemas import CollaborationRequest

REQUESTS_DB = []


def send_collaboration_request(sender_id, recipient_id, project_id, invite):
    request = CollaborationRequest(
        senderId=sender_id,
        recipientId=recipient_id,
        projectId=project_id,
        subject=invite.subject,
        message=invite.message,
        status="pending"
    )
    REQUESTS_DB.append(request)
    return request