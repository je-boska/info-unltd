import { Page } from '../types/shared';
import { contentfulQuery } from './Query';

export async function getInfoPage() {
  const query = /* GRAPHQL */ `
    query InfoPageQuery {
      page (id: "7vWfAXb09uHZM8AbibfCkd") {
        title
        body {
          json
          links {
            assets {
              block {
                sys {
                  id
                }
                contentType
                title
                url
              }
            }
          }
        }
      }
    }
  `;

  const {
    data: { page },
  } = await contentfulQuery(query);

  return page as Page;
}
