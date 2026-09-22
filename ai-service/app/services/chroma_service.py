# import chromadb


# # ChromaDB ko local folder mein store karenge
# client = chromadb.PersistentClient(
#     path="./chroma_db"
# )


# # PDF documents ke embeddings ke liye collection
# collection = client.get_or_create_collection(
#     name="pdf_documents"
# )


# def add_document(
#     text: str,
#     embedding: list,
#     document_id: str
# ):
#     """
#     Text aur uski embedding ko ChromaDB mein save karta hai.
#     """

#     collection.add(
#         ids=[document_id],
#         embeddings=[embedding],
#         documents=[text]
#     )


# def search_documents(
#     query_embedding: list,
#     top_k: int = 3
# ):
#     """
#     Query embedding ke basis par relevant documents search karta hai.
#     """

#     results = collection.query(
#         query_embeddings=[query_embedding],
#         n_results=top_k
#     )

#     return results

import chromadb


client = chromadb.PersistentClient(
    path="./chroma_db"
)


collection = client.get_or_create_collection(
    name="pdf_documents"
)


def add_documents(
    chunks: list[str],
    embeddings: list[list[float]]
):
    """
    PDF ke chunks aur unki embeddings
    ChromaDB mein store karta hai.
    """

    ids = [
        f"chunk-{i}"
        for i in range(len(chunks))
    ]

    collection.add(
        ids=ids,
        embeddings=embeddings,
        documents=chunks
    )


def search_documents(
    query_embedding: list[float],
    top_k: int = 3
):
    """
    Query ke similar PDF chunks return karta hai.
    """

    results = collection.query(
        query_embeddings=[query_embedding],
        n_results=top_k
    )

    return results