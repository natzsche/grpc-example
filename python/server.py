import grpc
import example_pb2
import example_pb2_grpc
import time, random
from concurrent import futures


class ExampleServicer(example_pb2_grpc.ExampleServiceServicer):
    def SayHello(self, request, context):
        response = example_pb2.HelloResponse()
        response.reply = "Hello " + request.greeting + "!"
        return response

    def DoAddition(self, request, context):
        response = example_pb2.NumberResponse()
        response.result = request.first_number + request.second_number
        return response

    def DoSubtraction(self, request, context):
        response = example_pb2.NumberResponse()
        response.result = request.first_number - request.second_number
        return response

    def BookInfo(self, request, context):
        response = example_pb2.BookInfoResponse()
        book_info = (f"Books `{request.title}` with author: {request.author}, "
                     f"Published on: {request.published}, edition: {request.edition}, "
                     f"ISBN: {request.isbn}")
        q_stamp = str(time.time()).split(".")
        q_stamp = int(q_stamp[0])
        response.book_info = book_info;
        response.query_unix_stamp = f"{q_stamp}"
        response.status = random.choice(["sold out", "ready stock"])
        return response

def main():
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))

    example_pb2_grpc.add_ExampleServiceServicer_to_server(
        ExampleServicer(), server)

    print('Starting server. Listening on port 50050.')
    server.add_insecure_port('[::]:50050')
    server.start()

    try:
        while True:
            time.sleep(86400)

    except KeyboardInterrupt:
        server.stop(0)


if __name__ == '__main__':
    main()
