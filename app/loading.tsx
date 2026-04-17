import Loader from '../components/ui/Loader';

export default function Loading() {
  return (
    <div style={{height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      <Loader />
    </div>
  );
}
