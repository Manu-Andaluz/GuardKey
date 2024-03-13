import hashlib
from django.db import models
from cryptography.fernet import Fernet
from django.db import models

# Create your models here.
class PasswordManager(models.Model):
    master_password_hash = models.CharField(max_length=1000)
    password_file = models.CharField(max_length=1000)
    password_dict = models.JSONField(default=dict)

    def create_key(self, path):
        self.key = Fernet.generate_key()
        with open(path, 'wb') as key_file:  # Open the file at the given path
            key_file.write(self.key)        # Write the generated key to the file
    
    def set_master_password(self, master_password):
        # Store the hashed master password securely
        if not PasswordManager.objects.exists():
            # Store the hashed master password securely
            self.master_password_hash = hashlib.sha256(master_password.encode()).hexdigest()
            self.save()  # Save the instance to the database
            return True
        else:
            return False

    def verify_master_password(self, entered_password):
        # Verify the entered master password against the stored hash
        entered_password_hash = hashlib.sha256(entered_password.encode()).hexdigest()
        curent_password = PasswordManager.objects.all()
        # print(entered_password_hash, self.master_password_hash)
        return curent_password[0].master_password_hash == entered_password_hash

    def derive_key_from_master_password(self):
        # Derive the encryption key from the master password
        return hashlib.sha256(self.master_password_hash.encode()).digest()

    def create_password_file(self,path,initial_values=None):
        self.password_file = path

        if initial_values is not None:
            for key, value in initial_values.items():
                self.add_password(key,value)
                
    def load_password_file(self,path):
        self.password_file = path
        key = self.derive_key_from_master_password()

        with open(path, "r") as f:
            for line in f:
                site, encrypted = line.split(" : ")
                self.password_dict[site] : Fernet(key).decrypt(encrypted.encode()).decode()

    def add_password(self,site,password):
        self.password_dict[site] = password
        key = self.derive_key_from_master_password()
        
        if self.password_file is not None:
            with open(self.password_file, "a+") as f:
                encypted = Fernet(key).encrypt(password.encode())
                f.write(site + " : " + encypted.decode() + "\n")
                
    def get_password(self,site):
        return self.password_dict[site]