from rest_framework.views import APIView
from .serializers import UserSerializer
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
from .models import User
import jwt
from datetime import datetime, timedelta, timezone

class RegisterView(APIView):
    def post(self,request):
        serializer=UserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)
          
class LoginView(APIView):

    def post(self,request):
        email=request.data['email']
        password=request.data['password']
        
        user=User.objects.filter(email=email).first()

        if user is None:
            raise AuthenticationFailed('User not found ! kindly check your email!')
        
        if not user.check_password(password):
            raise AuthenticationFailed('Password doesnt match ! kindly check your password!')
        
        payload={
           "id": user.id,
            "exp": datetime.now(timezone.utc) + timedelta(minutes=60),
            "iat": datetime.now(timezone.utc)
        }

        token=jwt.encode(payload,'secret',algorithm="HS256")

        response=Response()

        response.set_cookie(key='jwt',value=token)
        response.data={
            'jwt':token
        }
        return response
    
class UserView(APIView):

    def get(self, request):
        token = request.COOKIES.get('jwt')
        if not token:
            raise AuthenticationFailed('Unauthenticated!')

        try:
            payload = jwt.decode(token, 'secret', algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Unauthenticated! Token has expired.')

        user = User.objects.filter(id=payload['id']).first()
        if user is None:
            raise AuthenticationFailed('User not found.')

        serializer = UserSerializer(user)
        return Response(serializer.data)
    
class LogoutView(APIView):

    def post(self,request):
        response =Response()
        response.delete_cookie(key='jwt') 
        response.data={
            'message':'success'
        }
        return  response
        