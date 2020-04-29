import grpc
import example_pb2 as pb
import example_pb2_grpc


def main():

    # Create channel and stub to server's address and port.
    channel = grpc.insecure_channel('localhost:50050')
    stub = example_pb2_grpc.ExampleServiceStub(channel)
    
    # Exception handling.
    try:
        response = stub.BookInfo(
            pb.BookInfoRequest(
                title="Kafka on the Sea Shore", 
                published=2,
                edition=3,
                isbn="90980802934809",
                author="Haruki Murakami"
            ))
        print(response)

    # Catch any raised errors by grpc.
    except grpc.RpcError as e:
        print("Error raised: " + e)

if __name__ == '__main__':
    main()
