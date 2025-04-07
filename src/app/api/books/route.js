import data from './../../../../data.json'
import { writeFile, readFile } from 'fs/promises';
import path from 'path';
const dataFilePath = path.join(process.cwd(), 'data.json');
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
  const query = searchParams.get('query');
  const id = searchParams.get('id');

        let filtered = data;
        if(id){
            filtered = data.filter((book) =>book._id === +id)
            return Response.json({ data: filtered[0], status: true});
        }

        if (query) {
            filtered = data.filter((book) =>
            book.title.toLowerCase().includes(query.toLowerCase())
        );
        if(filtered.length===0){
            return Response.json({ data: filtered.slice(0, 15), status: false});
        }
  }

  return Response.json({ data: filtered.slice(0, 15), status: true });
  } catch (error) {
    return Response.json({ data: filtered.slice(0, 15), status: false });
  }
}
export async function POST(req) {
    try {
      const body = await req.json();
  
      // Read existing data
      const fileContent = await readFile(dataFilePath, 'utf-8');
      const data = JSON.parse(fileContent);
  
      // Generate new _id
      const nextId = Math.max(...data.map(b => b._id)) + 1;
  
      // Create new book entry
      const newBook = { _id: nextId, ...body };
  
      // Add new book to the array
      data.push(newBook);
  
      // Write updated data to file
      await writeFile(dataFilePath, JSON.stringify(data, null, 2));
  
      return new Response(JSON.stringify({ success: true, book: newBook }), { status: 201 });
    } catch (err) {
      return new Response(JSON.stringify({ success: false, error: err.message }), { status: 500 });
    }
  }
  