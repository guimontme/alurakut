import { SiteClient } from 'datocms-client';

export default async function postCommunities(request, response) {
 
  if (request.method === 'POST') {
    // Process a POST request
    const TOKEN = '2582818a1b1224121b29ffc4d06ab0';
    const client = new SiteClient(TOKEN);
    const registerCreated = await client.items.create({
      itemType: "970845", // Model ID configurado no Dato
      ...request.body,
    });
    response.json({
        registerCreated: registerCreated,
    });
  } else {
    // Handle any other HTTP method
    response.status(404).json({
      mensagem: 'Only for POST method'
    });
  }
  
}