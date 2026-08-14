import { Router, type IRouter } from "express";
import healthRouter from "./health";
import articlesRouter from "./articles";
import galleryRouter from "./gallery";
import programsRouter from "./programs";
import umkmRouter from "./umkm";
import publicationsRouter from "./publications";
import partnersRouter from "./partners";
import statsRouter from "./stats";
import adminAuthRouter from "./admin-auth";
import adminArticlesRouter from "./admin-articles";
import adminProgramsRouter from "./admin-programs";
import adminUmkmRouter from "./admin-umkm";
import adminPublicationsRouter from "./admin-publications";
import adminPartnersRouter from "./admin-partners";
import adminGalleryRouter from "./admin-gallery";
import adminUploadRouter from "./admin-upload";

const router: IRouter = Router();

// Public routes
router.use(healthRouter);
router.use(articlesRouter);
router.use(galleryRouter);
router.use(programsRouter);
router.use(umkmRouter);
router.use(publicationsRouter);
router.use(partnersRouter);
router.use(statsRouter);

// Admin routes
router.use(adminAuthRouter);
router.use(adminArticlesRouter);
router.use(adminProgramsRouter);
router.use(adminUmkmRouter);
router.use(adminPublicationsRouter);
router.use(adminPartnersRouter);
router.use(adminGalleryRouter);
router.use(adminUploadRouter);

export default router;
