# # from fastapi import APIRouter, UploadFile, File, Depends, HTTPException

# # from app.auth import get_current_user
# # from app.models.user import User

# # from app.services.pdf_service import extract_text_from_pdf
# # from app.services.chunk_service import chunk_text
# # from app.services.embedding_service import create_embedding
# # from app.services.chroma_service import add_documents

# # import tempfile
# # import os


# # router = APIRouter(
# #     prefix="/pdf",
# #     tags=["PDF"]
# # )


# # @router.post("/upload")
# # async def upload_pdf(
# #     file: UploadFile = File(...),
# #     current_user: User = Depends(get_current_user)
# # ):
# #     # Step 1: Check file type
# #     if file.content_type != "application/pdf":
# #         raise HTTPException(
# #             status_code=400,
# #             detail="Only PDF files are allowed"
# #         )

# #     # Step 2: Read uploaded PDF
# #     file_content = await file.read()

# #     # Step 3: Create temporary PDF file
# #     with tempfile.NamedTemporaryFile(
# #         delete=False,
# #         suffix=".pdf"
# #     ) as temp_file:

# #         temp_file.write(file_content)

# #         temp_file_path = temp_file.name

# #     try:
# #         # Step 4: Extract text from PDF
# #         extracted_text = extract_text_from_pdf(
# #             temp_file_path
# #         )

# #         # Step 5: Split text into chunks
# #         chunks = chunk_text(
# #             extracted_text,
# #             chunk_size=1000,
# #             chunk_overlap=200
# #         )

# #         # Step 6: Create embeddings
# #         embeddings = [
# #             create_embedding(chunk)
# #             for chunk in chunks
# #         ]

# #         # Step 7: Store chunks + embeddings in ChromaDB
# #         add_documents(
# #             chunks=chunks,
# #             embeddings=embeddings
# #         )

# #         # Step 8: Return response
# #         return {
# #             "message": "PDF processed and stored successfully",
# #             "filename": file.filename,
# #             "total_characters": len(extracted_text),
# #             "total_chunks": len(chunks),
# #             "chunks": chunks[:5]
# #         }

# #     finally:
# #         # Step 9: Delete temporary PDF
# #         if os.path.exists(temp_file_path):
# #             os.remove(temp_file_path)


# from fastapi import APIRouter, UploadFile, File, Depends, HTTPException
# from pydantic import BaseModel

# from app.auth import get_current_user
# from app.models.user import User

# from app.services.pdf_service import extract_text_from_pdf
# from app.services.chunk_service import chunk_text
# from app.services.embedding_service import create_embedding
# from app.services.rag_service import answer_from_pdf

# from app.services.chroma_service import (
#     add_documents,
#     search_documents
# )

# import tempfile
# import os


# router = APIRouter(
#     prefix="/pdf",
#     tags=["PDF"]
# )


# # ==============================
# # PDF Search Request
# # ==============================

# class PDFSearchRequest(BaseModel):
#     query: str


# # ==============================
# # PDF Upload
# # ==============================

# @router.post("/upload")
# async def upload_pdf(
#     file: UploadFile = File(...),
#     current_user: User = Depends(get_current_user)
# ):
#     # Step 1: Check file type
#     if file.content_type != "application/pdf":
#         raise HTTPException(
#             status_code=400,
#             detail="Only PDF files are allowed"
#         )

#     # Step 2: Read uploaded PDF
#     file_content = await file.read()

#     # Step 3: Create temporary PDF file
#     with tempfile.NamedTemporaryFile(
#         delete=False,
#         suffix=".pdf"
#     ) as temp_file:

#         temp_file.write(file_content)

#         temp_file_path = temp_file.name

#     try:
#         # Step 4: Extract text
#         extracted_text = extract_text_from_pdf(
#             temp_file_path
#         )

#         # Step 5: Create chunks
#         chunks = chunk_text(
#             extracted_text,
#             chunk_size=1000,
#             chunk_overlap=200
#         )

#         # Step 6: Create embeddings
#         embeddings = [
#             create_embedding(chunk)
#             for chunk in chunks
#         ]

#         # Step 7: Store in ChromaDB
#         add_documents(
#             chunks=chunks,
#             embeddings=embeddings
#         )

#         # Step 8: Return result
#         return {
#             "message": "PDF processed and stored successfully",
#             "filename": file.filename,
#             "total_characters": len(extracted_text),
#             "total_chunks": len(chunks),
#             "chunks": chunks[:5]
#         }

#     finally:
#         # Step 9: Delete temporary file
#         if os.path.exists(temp_file_path):
#             os.remove(temp_file_path)


# # ==============================
# # Semantic Search
# # ==============================

# @router.post("/search")
# def search_pdf(
#     request: PDFSearchRequest,
#     current_user: User = Depends(get_current_user)
# ):
#     # Step 1: Convert user question into embedding
#     query_embedding = create_embedding(
#         request.query
#     )

#     # Step 2: Search similar chunks in ChromaDB
#     results = search_documents(
#         query_embedding=query_embedding,
#         top_k=3
#     )

#     # Step 3: Return relevant chunks
#     return {
#         "query": request.query,
#         "results": results["documents"][0]
#     }

# # ==============================
# # Ask Question From PDF
# # ==============================

# @router.post("/ask")
# def ask_pdf(
#     request: PDFSearchRequest,
#     current_user: User = Depends(get_current_user)
# ):
#     answer = answer_from_pdf(
#         request.query
#     )

#     return {
#         "question": request.query,
#         "answer": answer
#     }


# from fastapi import (
#     APIRouter,
#     UploadFile,
#     File,
#     Depends,
#     HTTPException
# )

# from pydantic import BaseModel

# from app.auth import get_current_user
# from app.models.user import User

# from app.services.pdf_service import extract_text_from_pdf
# from app.services.chunk_service import chunk_text
# from app.services.embedding_service import create_embedding
# from app.services.rag_service import answer_from_pdf

# from app.services.chroma_service import (
#     add_documents,
#     search_documents
# )

# import tempfile
# import os


# router = APIRouter(
#     prefix="/pdf",
#     tags=["PDF"]
# )


# # ==============================
# # PDF Request Model
# # ==============================

# class PDFSearchRequest(BaseModel):
#     query: str
#     history: list[dict] = []


# # ==============================
# # PDF Upload
# # ==============================

# @router.post("/upload")
# async def upload_pdf(
#     file: UploadFile = File(...),
#     current_user: User = Depends(get_current_user)
# ):
#     # Step 1: Check file type

#     if file.content_type != "application/pdf":
#         raise HTTPException(
#             status_code=400,
#             detail="Only PDF files are allowed"
#         )

#     # Step 2: Read uploaded PDF

#     file_content = await file.read()

#     # Step 3: Create temporary PDF file

#     with tempfile.NamedTemporaryFile(
#         delete=False,
#         suffix=".pdf"
#     ) as temp_file:

#         temp_file.write(file_content)

#         temp_file_path = temp_file.name

#     try:
#         # Step 4: Extract text from PDF

#         extracted_text = extract_text_from_pdf(
#             temp_file_path
#         )

#         # Step 5: Split text into chunks

#         chunks = chunk_text(
#             extracted_text,
#             chunk_size=1000,
#             chunk_overlap=200
#         )

#         # Step 6: Create embeddings

#         embeddings = [
#             create_embedding(chunk)
#             for chunk in chunks
#         ]

#         # Step 7: Store chunks and embeddings

#         add_documents(
#             chunks=chunks,
#             embeddings=embeddings
#         )

#         # Step 8: Return result

#         return {
#             "message": "PDF processed and stored successfully",
#             "filename": file.filename,
#             "total_characters": len(extracted_text),
#             "total_chunks": len(chunks),
#             "chunks": chunks[:5]
#         }

#     finally:
#         # Step 9: Delete temporary file

#         if os.path.exists(temp_file_path):
#             os.remove(temp_file_path)


# # ==============================
# # Semantic Search
# # ==============================

# @router.post("/search")
# def search_pdf(
#     request: PDFSearchRequest,
#     current_user: User = Depends(get_current_user)
# ):
#     # Step 1: Convert question into embedding

#     query_embedding = create_embedding(
#         request.query
#     )

#     # Step 2: Search similar chunks

#     results = search_documents(
#         query_embedding=query_embedding,
#         top_k=3
#     )

#     # Step 3: Return relevant chunks

#     return {
#         "query": request.query,
#         "results": results["documents"][0]
#     }


# # ==============================
# # Ask Question From PDF
# # ==============================

# @router.post("/ask")
# def ask_pdf(
#     request: PDFSearchRequest,
#     current_user: User = Depends(get_current_user)
# ):
#     # Step 1: Send question + history
#     # to RAG service

#     answer = answer_from_pdf(
#         question=request.query,
#         history=request.history
#     )

#     # Step 2: Return answer

#     return {
#         "question": request.query,
#         "answer": answer
#     }


from fastapi import (
    APIRouter,
    UploadFile,
    File,
    Depends,
    HTTPException
)

from pydantic import BaseModel

from app.auth import get_current_user
from app.models.user import User

from app.services.pdf_service import extract_text_from_pdf
from app.services.chunk_service import chunk_text
from app.services.embedding_service import create_embedding
from app.services.rag_service import answer_from_pdf

from app.services.chroma_service import (
    add_documents,
    search_documents
)

import tempfile
import os
import uuid


router = APIRouter(
    prefix="/pdf",
    tags=["PDF"]
)


# ==============================
# PDF Request Model
# ==============================

class PDFSearchRequest(BaseModel):
    query: str
    history: list[dict] = []
    document_id: str


# ==============================
# PDF Upload
# ==============================

@router.post("/upload")
async def upload_pdf(
    file: UploadFile = File(...),
    current_user: User = Depends(get_current_user)
):

    # Step 1: Check file type

    if file.content_type != "application/pdf":
        raise HTTPException(
            status_code=400,
            detail="Only PDF files are allowed"
        )

    # Step 2: Read uploaded PDF

    file_content = await file.read()

    # Step 3: Generate unique document ID

    document_id = str(uuid.uuid4())

    # Step 4: Create temporary PDF file

    with tempfile.NamedTemporaryFile(
        delete=False,
        suffix=".pdf"
    ) as temp_file:

        temp_file.write(file_content)

        temp_file_path = temp_file.name

    try:

        # Step 5: Extract text from PDF

        extracted_text = extract_text_from_pdf(
            temp_file_path
        )

        # Step 6: Split text into chunks

        chunks = chunk_text(
            extracted_text,
            chunk_size=1000,
            chunk_overlap=200
        )

        # Step 7: Create embeddings

        embeddings = [
            create_embedding(chunk)
            for chunk in chunks
        ]

        # Step 8: Store chunks and embeddings

        add_documents(
            chunks=chunks,
            embeddings=embeddings,
            document_id=document_id
        )

        # Step 9: Return result

        return {
            "message": "PDF processed and stored successfully",
            "filename": file.filename,
            "document_id": document_id,
            "total_characters": len(extracted_text),
            "total_chunks": len(chunks),
            "chunks": chunks[:5]
        }

    finally:

        # Step 10: Delete temporary file

        if os.path.exists(temp_file_path):
            os.remove(temp_file_path)


# ==============================
# Semantic Search
# ==============================

@router.post("/search")
def search_pdf(
    request: PDFSearchRequest,
    current_user: User = Depends(get_current_user)
):

    # Step 1: Convert question into embedding

    query_embedding = create_embedding(
        request.query
    )

    # Step 2: Search only inside selected PDF

    results = search_documents(
        query_embedding=query_embedding,
        document_id=request.document_id,
        top_k=3
    )

    # Step 3: Return relevant chunks

    return {
        "query": request.query,
        "document_id": request.document_id,
        "results": results["documents"][0]
    }


# ==============================
# Ask Question From PDF
# ==============================

@router.post("/ask")
def ask_pdf(
    request: PDFSearchRequest,
    current_user: User = Depends(get_current_user)
):

    # Step 1: Send question,
    # history and document ID
    # to RAG service

    answer = answer_from_pdf(
        question=request.query,
        history=request.history,
        document_id=request.document_id
    )

    # Step 2: Return answer

    return {
        "question": request.query,
        "document_id": request.document_id,
        "answer": answer
    }