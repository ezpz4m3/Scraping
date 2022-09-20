from urllib import request
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status, permissions
from .serializers import Userserializer, Bookserializer
from .models import Users, Books
import secrets
from rest_framework_simplejwt.tokens import RefreshToken



# Create your views here.
class Signup(APIView):
    permission_classes = (permissions.AllowAny,)
    def post(self,request):
        # try:
            if request.data['type'] =='':
                return Response({"message":'Please select if you are an admin or a student','success':'false'},400)
            serializer = Userserializer(data=request.data)
            token=secrets.token_hex(16)
            if serializer.is_valid():
                serializer.save()
                user = Users.objects.filter(email=serializer.data['email']).last()
                if request.data['type']=="student":
                    user.is_student=True
                else:
                    user.is_admin = True
                user.token = token
                user.save()
                return Response({'message':'Registration Successfull','success':'true'},status=status.HTTP_200_OK)
            return Response({'message':serializer.errors,'success':'false'},status=status.HTTP_400_BAD_REQUEST)
        # except:
        #    return Response({"message":"Error occurred, please try later",'success':'false'},status=status.HTTP_400_BAD_REQUEST)


class BookApi(APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self,request):
        all_books = Books.objects.values()
        list_of_books=[]
        for book in all_books:
            data={}
            data['id']=book['id']
            data['book_name']=book['book_name']
            data['book_content']=book['book_content']
            data['book_author_email']=book['book_author_email']
            data['book_price']=book['book_price']   
            list_of_books.append(data) 
        if len(list_of_books)>0:
            return Response({"message":list_of_books,'success':'true'},status=status.HTTP_200_OK)
        else:
            return Response({"message":'No books in the database','success':'false'},status=status.HTTP_404_NOT_FOUND)

    def post(self,request):
        serializer = Bookserializer(data=request.data)
        if Users.objects.filter(email=request.data['book_author_email'], is_admin= True).exists():
            if serializer.is_valid():
                serializer.save()
                author=Users.objects.filter(email=serializer.data['book_author_email']).last()
                book= Books.objects.filter(book_author_email=serializer.data['book_author_email'],book_name=serializer.data['book_name']).last()
                book.token = author.token
                book.save()
                return Response({'message':'Book entry created','success':'true'},status=status.HTTP_201_CREATED)
            return Response({'message':serializer.errors,'success':'false'},status=status.HTTP_400_BAD_REQUEST)
        return Response({'message':'You do not have permission to make this change','success':'false'},status=status.HTTP_400_BAD_REQUEST)

    def put(self,request):
        print(request.data)
        email = request.data['book_author_email']
        book_name= request.data['book_name']
        new_content = request.data['book_content']
        if Users.objects.filter(email=request.data['book_author_email'], is_admin= True).exists():
            if Books.objects.filter(book_author_email=email,book_name=book_name).exists():
                book = Books.objects.filter(book_author_email=email,book_name=book_name).last()
                book.content = new_content
                book.save()
                return Response({'message':'Book content updated','success':'true'},status=status.HTTP_202_ACCEPTED)
            return Response({'message':'Could not find any such book created by you','success':'false'},status=status.HTTP_400_BAD_REQUEST)
        return Response({'message':'You do not have permission to make this change','success':'false'},status=status.HTTP_400_BAD_REQUEST)

    def delete(self,request):
        print(request.data)
        email = request.data['book_author_email']
        book_name= request.data['book_name']
        if Users.objects.filter(email=request.data['book_author_email'], is_admin= True).exists():
            if Books.objects.filter(book_author_email=email,book_name=book_name).exists():
                book = Books.objects.filter(book_author_email=email,book_name=book_name).last()
                book.delete()
                return Response({'message':'Book deleted successfully','success':'true'},status=status.HTTP_200_OK)
            return Response({'message':'Could not find any such book created by you','success':'false'},status=status.HTTP_400_BAD_REQUEST)
        return Response({'message':'You do not have permission to make this change','success':'false'},status=status.HTTP_400_BAD_REQUEST)

class LogoutAndBlacklistRefreshTokenForUserView(APIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = ()

    def post(self, request):
        try:
            refresh_token = request.data["refresh_token"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)
 
class Type(APIView):
    permission_classes = (permissions.AllowAny,)
    def get(self,request):
        email= request.GET['email']
        user= Users.objects.get(email=email)
        type=''
        if user.is_admin == True:
            type='admin'
        else:
            type='student'
        return Response({'message':type,'success':"true"},status=status.HTTP_200_OK) 
