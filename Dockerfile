FROM node:18-alpine AS base

FROM base AS deps

# libc6-compat is a shared library that may be required for process.dlopen
RUN apk add --no-cache libc6-compat
WORKDIR /app

# install dependencies, can likely remove the yarn and pnpm files
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
RUN \
    if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
    elif [ -f package-lock.json ]; then npm ci; \
    elif [ -f pnpm-lock.yaml ]; then yarn global add pnpm i --frozen-lockfile; \
    fi;

# rebuild source only as needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# uncomment below if you do not want Next.js to collect anonymous telemetry data about usage
# ENV NEXT_TELEMETRY_DISABLED 1
COPY .env.local .env.production
RUN yarn build

# can also run as npm, uncomment and comment out the yarn command if so
# RUN npm run build

# production image, copy files and run Next.js server
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
#ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000
ENV PORT 3000

CMD ["node", "server.js"]
