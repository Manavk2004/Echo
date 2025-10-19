import { openai } from "@ai-sdk/openai";
import { RAG } from "@convex-dev/rag";
import { components } from "../../_generated/api";

const rag = new RAG(components.rag, {
    textEmbeddingModel: "text-embedding-3-large",
    embeddingDimension: 3072, // text-embedding-3-large uses 3072 dimensions
})

export default rag;