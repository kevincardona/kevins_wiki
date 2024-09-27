FROM --platform=linux/amd64 node:20-alpine as base
WORKDIR /app
RUN npm install -g pnpm
COPY package.json /app
COPY pnpm-lock.yaml /app
RUN pnpm install --frozen-lockfile --prod
COPY . /app

FROM base as build
RUN pnpm install --frozen-lockfile
RUN pnpm build

FROM --platform=linux/amd64 node:20-alpine as dev
WORKDIR /app
COPY --from=build /app /app
RUN npm install -g pnpm
RUN pnpm install --frozen-lockfile
CMD ["pnpm", "dev"]

FROM --platform=linux/amd64 node:20-alpine as prod
WORKDIR /app
COPY --from=base /app /app
COPY --from=build /app/.next /app/.next
CMD ["npm", "run", "start"]
EXPOSE 3434

