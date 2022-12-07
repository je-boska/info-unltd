import { ErrorPayload } from '../types/shared';

function getErrorMessage(payload: ErrorPayload) {
  return payload.errors[0].message;
}

export async function contentfulQuery(
  query: any,
  variables?: Record<string, string | boolean | number>
) {
  if (process.env.NODE_ENV !== 'production') {
    const queryName = query.trimStart().substring(6, query.indexOf('Query'));

    console.log('[graphql]', queryName, variables);
  }

  const res = await fetch(
    `https://graphql.contentful.com/content/v1/spaces/${process.env.PUBLIC_CONTENTFUL_SPACE_ID}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.PUBLIC_CONTENTFUL_ACCESS_TOKEN}`,
      },
      body: JSON.stringify({
        query,
        variables,
      }),
    }
  );

  if (res.ok) {
    return res.json();
  } else {
    throw new Error(getErrorMessage(await res.json()));
  }
}
