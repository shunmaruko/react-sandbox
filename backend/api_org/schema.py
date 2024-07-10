from pydantic import BaseModel, EmailStr, ConfigDict, Field

class UserDTO(BaseModel):
    model_config = ConfigDict(extra="ignore")
    email: EmailStr
    role: str = Field(description="Role such as ADMIN, GENERAL")

if __name__=="__main__":
    import json 
    import base64
    user = UserDTO(email="aaa@gmail.com", roles=["GENERAL"])
    res = json.JSONEncoder().encode(user.model_dump())
    res_encoded = base64.b64encode(res.encode("utf-8"))
    res_decoded = base64.b64decode(res_encoded.decode("utf-8"))
    print(user.model_dump_json())
    print(res)
    print(res_encoded)
    print(res_decoded)