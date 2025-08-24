import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "http://localhost:4545/graphql",
  documents: ["./zapi/**/*.{ts,tsx}", "./zapi/**/*.gql", "./zapi/graphql/*.gql"],
  generates: {
    "./zapi/__generated__/": {
      // './src/graphql/': {
      preset: "client",
      presetConfig: {
        // gqlTagName: "gql",
        fragmentMasking: false,
      },
      // plugins: [
      // 	'typescript',
      // 	'typescript-operations',
      // 	'typed-document-node',
      // 	'graphql-codegen-svelte-apollo'
      // ]
      plugins: [
        // "typescript",
        // "typescript-operations",
        // !
        // "typed-document-node",
        // "typescript-document-nodes",
        // !
        // "typescript-react-apollo",
        // "typescript-resolvers",
      ],
    },
  },
  ignoreNoDocuments: true,
};
export default config;
