FROM node:20-slim AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN corepack enable
COPY . /home/node/app
WORKDIR /home/node/app


FROM base AS prod-deps
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod --frozen-lockfile


FROM base AS build
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm run build


FROM base
COPY --from=prod-deps /home/node/app/node_modules /home/node/app/node_modules
COPY --from=build /home/node/app/dist /home/node/app/dist
CMD [ "pnpm", "run", "start:prod" ]