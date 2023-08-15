import BooksScreen from './books';

export default async function Books() {
  return (
    <div className='w-full h-full flex flex-col justify-start items-start overflow-hidden p-10 box-border'>
      <BooksScreen />
    </div>
  );
}
