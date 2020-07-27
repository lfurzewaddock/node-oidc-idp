# node-oidc-idp

Note: this project is a monorepo.

## Project requirements

- Node 12+
- pnpm 5+

If pnpm package manager is not installed first use npm to install pnpm globally

```
npm add -g pnpm
```

Once installed, use pnpm to upgrade itself

```
pnpm add -g pnpm
```

## Setup Project

First, install all deps. from the project root;

```
pnpm -r i
```

Before running the project for the 1st time, generate keystores. From the project root;

```
cd ./packages/server/oidc/
node ./generate-keys.js
```

**Generate SSL certs for localhost dev environment: https://localhost.FQDN**

The link below is a complete set of instructions to setup Ubuntu as a CA to generate certificates for your local development environment;

Source: [https://networklessons.com/uncategorized/openssl-certification-authority-ca-ubuntu-server](https://networklessons.com/uncategorized/openssl-certification-authority-ca-ubuntu-server)

Notes/commands;

**Verify your FQDN**

```
$ hostname -f

HP.localdomain
```

**Configure OpenSSL**

```
$ vim /usr/lib/ssl/openssl.cnf
```

Under `[CA_default]` change `dir = ./demoCA` to

```
dir             = /root/ca
```

**Root CA**

```
$ sudo su
# mkdir /root/ca
# cd /root/ca
# mkdir newcerts certs crl private requests
# touch index.txt
# echo '1234' > serial
```

**Root private key**

```
# openssl genrsa -aes256 -out private/cakey.pem 4096
```

**Root certificate**

```
# openssl req -new -x509 -key /root/ca/private/cakey.pem -out cacert.pem -days 3650 -set_serial 0

Enter pass phrase for /root/ca/private/cakey.pem:

You are about to be asked to enter information that will be incorporated
into your certificate request.
What you are about to enter is what is called a Distinguished Name or a DN.
There are quite a few fields but you can leave some blank
For some fields there will be a default value,
If you enter '.', the field will be left blank.
-----
Country Name (2 letter code) [AU]:GB
State or Province Name (full name) [Some-State]:Greater London
Locality Name (eg, city) []:London
Organization Name (eg, company) [Internet Widgits Pty Ltd]:Local Dev
Organizational Unit Name (eg, section) []:
Common Name (e.g. server FQDN or YOUR name) []:HP.localdomain
Email Address []:admin@HP.localdomain
```

**Create a localhost certificate**

```
# cd /root/ca/requests/
```

Generate a private key (without encryption) to avoid needing to set a passphrase in Node.js

```
# openssl genrsa -out localhost.pem 2048
```

Create a CSR

```
# openssl req -new -key localhost_key.pem -out localhost.csr

Enter pass phrase for localhost_key.pem:

You are about to be asked to enter information that will be incorporated
into your certificate request.
What you are about to enter is what is called a Distinguished Name or a DN.
There are quite a few fields but you can leave some blank
For some fields there will be a default value,
If you enter '.', the field will be left blank.
-----
Country Name (2 letter code) [AU]:GB
State or Province Name (full name) [Some-State]:Greater London
Locality Name (eg, city) []:London
Organization Name (eg, company) [Internet Widgits Pty Ltd]:Local Dev
Organizational Unit Name (eg, section) []:
Common Name (e.g. server FQDN or YOUR name) []:localhost.HP.localdomain
Email Address []:admin@HP.localdomain

Please enter the following 'extra' attributes
to be sent with your certificate request
A challenge password []:
An optional company name []:
```

Sign the CSR

```
# openssl ca -in localhost.csr -out localhost.pem
```

Clean up

```
# rm localhost.csr
# mv localhost_key.pem /root/ca/private/
# mv localhost.pem /root/ca/certs/
```

Secure ca folder

```
# chmod -R 600 /root/ca
```

**Hosts file**

Alter hosts file to point localhost.HP.localdomain to 127.0.0.1

[https://www.howtogeek.com/howto/27350/beginner-geek-how-to-edit-your-hosts-file/](https://www.howtogeek.com/howto/27350/beginner-geek-how-to-edit-your-hosts-file/)

Windows: Use 'Run as administrator' to open notepad. Then open file `c:\windows\system32\drivers\etc\hosts` and add the following line;

```
127.0.0.1 localhost.HP.localdomain
```

Copy the `localhost.pem` and `localhost_key.pem` to `/packages/server/oidc/` and `/packages/client/oidc/`

**Hosts file**

- Rename `.env.example` to `.env` in `/packages/server/oidc/` and use your own FQDN
- Rename `.env.example` to `.env` in `/packages/client/oidc/` and use your own FQDN

## Run project

Start OIDC server. From the project root;

```
pnpm run root:server:oidc:start:dev
```

Open a new terminal.

Start OIDC UI consumer. From the project root;

```
pnpm run root:client:oidc:start:dev
```

Open a web browser using your own FQDN determined earlier

[https://localhost.YOUR-FQDN:8080](https://localhost.YOUR-FQDN:8080)
