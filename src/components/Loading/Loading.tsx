import style from '@/components/Loading/Loading.module.css'

export default function SkeletonTrack() {
  return (
    <div className={style.skeleton}>
      <div className={style.skeleton__track}>
        <div className={style.skeleton__title}>
          <div className={style.skeleton__titleImage}></div>
          <div className={style.skeleton__name}></div>
        </div>
        <div className={style.skeleton__author}></div>
        <div className={style.skeleton__album}></div>
      </div>
    </div>
  );
}
