import HomeScreen from './home/home';

export default async function Home() {
  return (
    <div className='w-full h-full flex flex-col justify-start items-start overflow-hidden p-10 box-border'>
      <HomeScreen />
    </div>
  );
}
