export interface Block {
    type: "text" | "heading" | "quote" | "code" | "sub-heading" | "title";
    color: "white" | "grey" | "red" | "orange" | "brown" | "pink" | "purple" | "blue" | "green";
    content: string;
    id: string;
}