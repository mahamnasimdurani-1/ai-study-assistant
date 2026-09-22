# import os

# from dotenv import load_dotenv
# from openai import OpenAI


# load_dotenv()


# client = OpenAI(
#     api_key=os.getenv("OPENAI_API_KEY")
# )


# def create_embedding(text: str):
#     response = client.embeddings.create(
#         model="text-embedding-3-small",
#         input=text
#     )

#     return response.data[0].embedding

from fastembed import TextEmbedding


# Embedding model load karo
model = TextEmbedding(
    model_name="BAAI/bge-small-en-v1.5"
)


def create_embedding(text: str):
    """
    Text ko numerical vector/embedding mein convert karta hai.
    """

    embeddings = list(
        model.embed([text])
    )

    return embeddings[0].tolist()