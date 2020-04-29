const grpc = require("grpc");
const protoLoader = require("@grpc/proto-loader");

//Load the protobuf
const proto = grpc.loadPackageDefinition(
  protoLoader.loadSync("../example.proto", {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
  })
);

//Create a new client instance that binds to the IP and port of the grpc server.
const client = new proto.example.ExampleService(
  "localhost:50050",
  grpc.credentials.createInsecure()
);

client.bookInfo(
  {
    title: "Kafka on the Sea Shore",
    author: "Haruki Murakami",
    published: 2,
    edition: 3,
    isbn: "90980802934809",
  },
  (error, response) => {
    if (!error) {
      console.log("book_info: " + response.book_info);
      console.log("query_unix_stamp: " + response.query_unix_stamp);
      console.log("status: " + response.status);
    } else {
      console.log("Error:", error.message);
    }
  }
);
