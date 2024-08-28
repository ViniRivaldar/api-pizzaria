export default function AdminRequired(req,res,next){
    const { admin } = req;

    if (admin) return next();

    return res.status(403).json({ error: 'Acesso negado. Permissão de administrador necessária.' });
}