const grpc = require("grpc");
const protoLoader = require("@grpc/proto-loader");

const server = new grpc.Server();

// Load protobuf
const proto = grpc.loadPackageDefinition(
  protoLoader.loadSync("../example.proto", {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
  })
);

//define the callable methods that correspond to the methods defined in the protofile
server.addService(proto.example.ExampleService.service, {
  sayHello(call, callback) {
    const greeting = call.request.greeting;
    callback(null, { reply: `Hello ${greeting}!` });
  },
  doAddition(call, callback) {
    const firstNumber = call.request.first_number;
    const secondNumber = call.request.second_number;
    callback(null, { result: firstNumber + secondNumber });
  },
  doSubtraction(call, callback) {
    const firstNumber = call.request.first_number;
    const secondNumber = call.request.second_number;
    callback(null, { result: firstNumber - secondNumber });
  },
  bookInfo(call, callback) {
    book_info_res = `Books \`${call.request.title}\` with author: ${call.request.author}, Published on: ${call.request.published}, edition: ${call.request.edition}, ISBN: ${call.request.isbn}`;
    items = ["sold out", "ready stock"];
    callback(null, {
      book_info: book_info_res,
      query_unix_stamp: `${new Date().getTime()}`,
      status: items[Math.floor(Math.random() * items.length)],
    });
  },
});

//Specify the IP and and port to start the grpc Server, no SSL in test environment
server.bind("0.0.0.0:50050", grpc.ServerCredentials.createInsecure());

//Start the server
server.start();
console.log("grpc server running on port:", "0.0.0.0:50050");
