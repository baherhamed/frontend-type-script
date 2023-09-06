import { site } from './site';
import { meta } from './meta';
import { Meta } from '../interfaces/meta';

export async function setMetaLanguage(
  page: string,
  language: string,
): Promise<{
  description: string;
  keywords: string;
  descriptionTag: string;
  keywordsTag: string;
}> {
  let metaData: Meta;
  const descriptionTag = 'description';
  const keywordsTag = 'keywords';
  let description = '';
  let keywords = '';

  for await (const item of meta) {
    if (item.page === page) {
      metaData = item;
    }
  }

  if (!language || language === site.language.ar) {
    keywords = metaData!.keywords.ar;
    description = metaData!.description.ar;
  } else if (language === site.language.en) {
    keywords = metaData!.keywords.en;
    description = metaData!.description.en;
  }

  return { description, keywords, keywordsTag, descriptionTag };
}
