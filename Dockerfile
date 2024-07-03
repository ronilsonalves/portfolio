FROM node:lts-alpine3.19 AS base

# Install dependencies only when needed
FROM base AS deps
# RUN apk update && apk add --no-cache apk-tools
# # Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
RUN \
    if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
    elif [ -f package-lock.json ]; then npm ci; \
    elif [ -f pnpm-lock.yaml ]; then yarn global add pnpm && pnpm i --frozen-lockfile; \
    else echo "Lockfile not found." && exit 1; \
    fi


# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED 1

# Use ARG to define build-time variables
# https://docs.docker.com/engine/reference/builder/#arg
ARG ALGOLIA_ADMIN_API_KEY
ARG CONTACT_MAIL_TO
ARG NEXT_PUBLIC_ALGOLIA_APP_ID
ARG NEXT_PUBLIC_ALGOLIA_INDEX_NAME
ARG NEXT_PUBLIC_ALGOLIA_PT_INDEX_NAME
ARG NEXT_PUBLIC_ALGOLIA_SEARCH_KEY
ARG NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT_ID
ARG NEXT_PUBLIC_GOOGLE_ADSENSE_SLOT_ID
ARG NEXT_PUBLIC_GTM_ID
ARG NEXT_PUBLIC_SANITY_API_VERSION
ARG NEXT_PUBLIC_SANITY_DATASET
ARG NEXT_PUBLIC_SANITY_PROJECT_ID
ARG NEXT_PUBLIC_SITE_NAME
ARG NEXT_PUBLIC_SITE_URL
ARG RESEND_API_KEY
ARG RESEND_EMAIL_FROM
ARG SANITY_API_READ_TOKEN
ARG SANITY_API_TOKEN
ARG SANITY_WEBHOOK_SECRET

# Pass the build-time variables to the environment variables
# https://docs.docker.com/engine/reference/builder/#env
ENV ALGOLIA_ADMIN_API_KEY=$ALGOLIA_ADMIN_API_KEY
ENV CONTACT_MAIL_TO=$CONTACT_MAIL_TO
ENV NEXT_PUBLIC_ALGOLIA_APP_ID=$NEXT_PUBLIC_ALGOLIA_APP_ID
ENV NEXT_PUBLIC_ALGOLIA_INDEX_NAME=$NEXT_PUBLIC_ALGOLIA_INDEX_NAME
ENV NEXT_PUBLIC_ALGOLIA_PT_INDEX_NAME=$NEXT_PUBLIC_ALGOLIA_PT_INDEX_NAME
ENV NEXT_PUBLIC_ALGOLIA_SEARCH_KEY=$NEXT_PUBLIC_ALGOLIA_SEARCH_KEY
ENV NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT_ID=$NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT_ID
ENV NEXT_PUBLIC_GOOGLE_ADSENSE_SLOT_ID=$NEXT_PUBLIC_GOOGLE_ADSENSE_SLOT_ID
ENV NEXT_PUBLIC_GTM_ID=$NEXT_PUBLIC_GTM_ID
ENV NEXT_PUBLIC_SANITY_API_VERSION=$NEXT_PUBLIC_SANITY_API_VERSION
ENV NEXT_PUBLIC_SANITY_DATASET=$NEXT_PUBLIC_SANITY_DATASET
ENV NEXT_PUBLIC_SANITY_PROJECT_ID=$NEXT_PUBLIC_SANITY_PROJECT_ID
ENV NEXT_PUBLIC_SITE_NAME=$NEXT_PUBLIC_SITE_NAME
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL
ENV RESEND_API_KEY=$RESEND_API_KEY
ENV RESEND_EMAIL_FROM=$RESEND_EMAIL_FROM
ENV SANITY_API_READ_TOKEN=$SANITY_API_READ_TOKEN
ENV SANITY_API_TOKEN=$SANITY_API_TOKEN
ENV SANITY_WEBHOOK_SECRET=$SANITY_WEBHOOK_SECRET

RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Automatically leverage output traces to reduce image size
# Note: You must change the output directive to "standalone" in next.config.js
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
# set hostname to localhost
ENV HOSTNAME "0.0.0.0"

# server.js is created by next build from the standalone output
# https://nextjs.org/docs/pages/api-reference/next-config-js/output
CMD ["node", "server.js"]
