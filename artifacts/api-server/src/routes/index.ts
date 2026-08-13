import { Router, type IRouter } from "express";
import healthRouter from "./health";
import articlesRouter from "./articles";
import galleryRouter from "./gallery";
import programsRouter from "./programs";
import umkmRouter from "./umkm";
import publicationsRouter from "./publications";
import partnersRouter from "./partners";
import statsRouter from "./stats";

const router: IRouter = Router();

router.use(healthRouter);
router.use(articlesRouter);
router.use(galleryRouter);
router.use(programsRouter);
router.use(umkmRouter);
router.use(publicationsRouter);
router.use(partnersRouter);
router.use(statsRouter);

export default router;
