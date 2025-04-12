FROM node:15-alpine

# Create app directory and set permissions
WORKDIR /app

# Set proper ownership
RUN chown -R node:node /app

# Copy package files first to leverage Docker cache
COPY --chown=node:node package.json package-lock.json ./

# Switch to non-root user
USER node

# Install dependencies
RUN npm install

# Copy all the source code with correct ownership
COPY --chown=node:node . .

# Expose port for development
EXPOSE 3000

# Start the app in development mode
CMD ["npm", "start"]
