
  ## Docker 'run' equivalent: TODO: make a container that issues certificates and makes schedualed checks.
  # IMPORTANT: remove testing/staging flag (--test-cert)
  docker run -v /mnt/datadisk-1/redbirdProxy/certificate:/etc/letsencrypt/ --entrypoint "certbot" certbot/dns-google:latest  certonly --agree-tos -n --test-cert --dns-google -m $EMAIL
  -d taleb.io -d cdn.taleb.io -d api.taleb.io -d socket.taleb.io
  -d gaziteng.com -d cdn.gaziteng.com -d api.gaziteng.com -d socket.gaziteng.com
  -d naifaboswiss.com -d cdn.naifaboswiss.com -d api.naifaboswiss.com -d socket.naifaboswiss.com
  -d dentrist.com
  -d assalammd.com
  -d webapp.run -d animalsounds.webapp.run
