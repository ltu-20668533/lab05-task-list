FROM node:5.4.1

# Run Tini as PID 1, allowing us to send signals like SIGTERM to the command
# we decide to run.
ENV TINI_VERSION v0.8.4
ADD https://github.com/krallin/tini/releases/download/${TINI_VERSION}/tini /tini
RUN chmod +x /tini
ENTRYPOINT ["/tini", "--"]

# Give unknown non-root users a place to call home.
# This is required for non-root npm install during development, and doesn't hurt
# production.
RUN mkdir -p /home/default && chmod 777 /home/default

# Create a working directory for our application.
RUN mkdir -p /app
WORKDIR /app

# Install dependencies with npm.
COPY package.json /app/
RUN npm install

# Move dependencies into a global location.
RUN mkdir -p /deps && mv node_modules /deps/
ENV NODE_PATH=/deps/node_modules

# Put executables in the system path.
ENV PATH=$NODE_PATH/.bin:$PATH

# Copy our application files into the image.
COPY . /app

# Bundle client-side assets
RUN rm -rf dist && NODE_ENV=production gulp build

# Start the server on exposed port 3000.
EXPOSE 3000
CMD [ "npm", "start" ]
