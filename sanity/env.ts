export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-01-18'

export const dataset = assertValue(
  process.env.NEXT_PUBLIC_SANITY_DATASET,
  'Missing environment variable: NEXT_PUBLIC_SANITY_DATASET'
)

export const projectId = assertValue(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  'Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID'
)
export const token = assertValue(
  "skiUZl9u6y2rWuvYLB2koSZBWcgnkVI3x50nzehjvFPgrycHV4EhSoeYK7IdeJ1KOx6v2GEY34iCfTVfDe92M3oAotDJ2g1uvn48Vuj2OIXUDm3ApCpUHQb9OehlYGeewe8b0PbjpmxrBKcR7ppovB10P7ENKcD6f8iZwHIhu9Zo6vsV6y9Y",
   'Missing environment variable: '
)

function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    throw new Error(errorMessage)
  }

  return v
}
