from fastapi import APIRouter, UploadFile, File, Depends, HTTPException
from app.auth import get_current_user
from app.models.user import User
from app.services.pdf_service import extract_text_from_pdf
import tempfile
import os


router = APIRouter(
    prefix="/pdf",
    tags=["PDF"]
)


@router.post("/upload")
async def upload_pdf(
    file: UploadFile = File(...),
    current_user: User = Depends(get_current_user)
):
    # Check file type
    if file.content_type != "application/pdf":
        raise HTTPException(
            status_code=400,
            detail="Only PDF files are allowed"
        )

    # Read uploaded file
    file_content = await file.read()

    # Create temporary PDF file
    with tempfile.NamedTemporaryFile(
        delete=False,
        suffix=".pdf"
    ) as temp_file:

        temp_file.write(file_content)
        temp_file_path = temp_file.name

    try:
        # Extract text
        extracted_text = extract_text_from_pdf(
            temp_file_path
        )

        return {
            "message": "PDF uploaded successfully",
            "filename": file.filename,
            "text_preview": extracted_text[:2000]
        }

    finally:
        # Delete temporary file
        if os.path.exists(temp_file_path):
            os.remove(temp_file_path)