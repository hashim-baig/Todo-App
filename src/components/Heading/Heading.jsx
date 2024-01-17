import './Heading.css';



export default function Heading({theme, handleTheme}) {

  return (
    <section className='heading'>
      <p>TODO</p>
      <button className='theme-btn' onClick={handleTheme}><img src={theme} alt="" /></button>
    </section>
  );
}