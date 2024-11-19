docker build -t node-image-app .   -->  -t is to specify name

docker run -p 4000:4000 -d --name <name> <ImageId> (-d detach mode from terminal) (--name we can give name )

docker ps -a --> gives all containers
docker image ls --> gives images 

docker stop <container id>
docker start <container id>

docker rm <container id> -f (-f is force)
docker rmi <imageId>

docker exec -it <container id>  bash -->  interactively run a shell session inside a running Docker container.

cat filename -> to print the contents in file

#### mounts ######
bind mount ---> docker run -v <local dir>:<folder in container>:<permissions> -p 4000:4000 -d <image name or id>  (permissions : "ro" -> read only)

docker volume ls --> lists the volumes 
docker volume prune  --> deletes all unnecessary volumes 

docker rm <container id > -fv -->(v deletes the volume while removing container)
docker volume rm <volume name >  --> deletes the specific volume 
