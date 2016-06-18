# Base this image on an official Node.js long term support image.
FROM node:6.2.1

# Use Tini as the init process. Tini will take care of important system stuff
# for us, like forwarding signals and reaping zombie processes.
RUN wget -qO /tini https://github.com/krallin/tini/releases/download/v0.9.0/tini \
 && chmod +x /tini
ENTRYPOINT ["/tini", "--"]

# If there is an NPM registry running on the host at port 4873, use that during
# build time.
RUN export NPM_REG_CACHE="http://$(ip route | awk '/default/ {print $3}'):4873" \
 && curl -sLI -m 1 -o /dev/null "$NPM_REG_CACHE" \
 && npm --silent set registry "$NPM_REG_CACHE" \
 || true

# Create a working directory for our application.
RUN mkdir -p /app
WORKDIR /app

# Install the project dependencies.
COPY package.json /app/
RUN npm --silent install \
 && mkdir /deps \
 && mv node_modules /deps/node_modules
ENV NODE_PATH=/deps/node_modules

# Put executables in the system path.
ENV PATH=$NODE_PATH/.bin:$PATH

# Copy our application files into the image.
COPY . /app

# Bundle client-side assets.
RUN rm -rf dist && NODE_ENV=production gulp build

# Create a non-privileged user for running commands inside the container.
RUN adduser --disabled-password --gecos '' appuser \
 && chown -R appuser:appuser /app
USER appuser

# Point NPM to the official registry.
RUN npm --silent set registry "https://registry.npmjs.org"

# Start the server on exposed port 3000.
EXPOSE 3000
CMD [ "npm", "start" ]
