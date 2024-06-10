import time
import uuid
import hashlib

# hash based on time
def create_hash():
        current_time = time.time()
        uid = uuid.uuid4()
        identifier_string = f"{current_time}_{uid}"
        digest = hashlib.md5(identifier_string.encode()).hexdigest() # md5 for a shorter hash
        return digest