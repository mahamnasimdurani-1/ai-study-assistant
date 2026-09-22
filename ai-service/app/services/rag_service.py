# from app.services.embedding_service import create_embedding
# from app.services.chroma_service import search_documents
# from app.services.ai_service import get_ai_response


# def answer_from_pdf(question: str):
#     # Step 1: Question ki embedding
#     query_embedding = create_embedding(question)

#     # Step 2: PDF se relevant chunks retrieve karo
#     results = search_documents(
#         query_embedding=query_embedding,
#         top_k=3
#     )

#     documents = results.get("documents", [[]])

#     if not documents or not documents[0]:
#         return "I could not find relevant information in the PDF."

#     relevant_chunks = documents[0]

#     # Step 3: Retrieved chunks ko context banao
#     context = "\n\n---\n\n".join(
#         relevant_chunks
#     )

#     # Step 4: AI ko question + PDF context do
#     messages = [
#         {
#             "role": "system",
#             "content": (
#                 "You are an AI Study Assistant. "
#                 "Answer the user's question using only "
#                 "the provided PDF context. "
#                 "If the answer is not present in the context, "
#                 "say that the information was not found in the PDF."
#             )
#         },
#         {
#             "role": "user",
#             "content": (
#                 f"PDF CONTEXT:\n\n"
#                 f"{context}\n\n"
#                 f"QUESTION:\n\n"
#                 f"{question}"
#             )
#         }
#     ]

#     # Step 5: Generate final answer
#     answer = get_ai_response(messages)

#     return answer

from app.services.embedding_service import create_embedding
from app.services.chroma_service import search_documents
from app.services.ai_service import get_ai_response


def answer_from_pdf(
    question: str,
    history: list | None = None
):
    """
    Answer a question using PDF context
    and previous conversation history.
    """

    # --------------------------------
    # Step 1: Question ki embedding
    # --------------------------------

    query_embedding = create_embedding(
        question
    )

    # --------------------------------
    # Step 2: PDF se relevant chunks
    # --------------------------------

    results = search_documents(
        query_embedding=query_embedding,
        top_k=3
    )

    documents = results.get(
        "documents",
        [[]]
    )

    if not documents or not documents[0]:
        return (
            "I could not find relevant information "
            "in the PDF."
        )

    relevant_chunks = documents[0]

    # --------------------------------
    # Step 3: PDF context
    # --------------------------------

    context = "\n\n---\n\n".join(
        relevant_chunks
    )

    # --------------------------------
    # Step 4: Messages prepare karo
    # --------------------------------

    messages = [
        {
            "role": "system",
            "content": (
                "You are an AI Study Assistant.\n\n"

                "Your job is to answer questions "
                "using the provided PDF context.\n\n"

                "Rules:\n"
                "1. Use the PDF context as the main "
                "source of information.\n"
                "2. Use conversation history to "
                "understand references such as "
                "'it', 'this', 'that', or 'the previous topic'.\n"
                "3. Do not invent information that "
                "is not supported by the PDF.\n"
                "4. If the answer is not present in "
                "the PDF context, clearly say that "
                "the information was not found in "
                "the PDF.\n"
                "5. Give a simple and educational "
                "explanation."
            )
        }
    ]

    # --------------------------------
    # Step 5: Previous conversation
    # --------------------------------

    if history:
        for message in history:
            messages.append(
                {
                    "role": message["role"],
                    "content": message["content"]
                }
            )

    # --------------------------------
    # Step 6: Current PDF context
    # --------------------------------

    messages.append(
        {
            "role": "user",
            "content": (
                "PDF CONTEXT:\n\n"
                f"{context}\n\n"
                "CURRENT QUESTION:\n\n"
                f"{question}"
            )
        }
    )

    # --------------------------------
    # Step 7: OpenAI se answer
    # --------------------------------

    answer = get_ai_response(
        messages
    )

    return answer