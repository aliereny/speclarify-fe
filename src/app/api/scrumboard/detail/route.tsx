import boardList from '@crema/fakedb/apps/scrumboard/boardList';

let boardData = boardList;

export const GET = async () => {
  try {
    return new Response(JSON.stringify(boardData), { status: 200 });
  } catch (error) {
    return new Response('Internal Server Error', { status: 500 });
  }
};
