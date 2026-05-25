import { listRecentDocuments, listRecentUsers } from "@/lib/db/admin";

import { AdminDocumentRow } from "@/components/admin/admin-document-row";
import { AdminUserRow } from "@/components/admin/admin-user-row";

export default async function AdminPage() {
  const [users, docs] = await Promise.all([
    listRecentUsers(40),
    listRecentDocuments(20),
  ]);

  return (
    <div className="space-y-12">
      <section>
        <h2 className="text-lg font-semibold">Utilisateurs récents</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Forcer le plan Pro/Business sans passer par Stripe (support, geste commercial).
        </p>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b text-sm text-muted-foreground">
                <th className="pb-2 pr-4">E-mail</th>
                <th className="pb-2 pr-4">Plan</th>
                <th className="pb-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <AdminUserRow
                  key={u.id}
                  userId={u.id}
                  email={u.email}
                  plan={u.plan}
                />
              ))}
            </tbody>
          </table>
          {users.length === 0 ? (
            <p className="mt-4 text-sm text-muted-foreground">Aucun utilisateur.</p>
          ) : null}
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold">Documents récents</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Corriger le JSON (ex. SIRET), sauvegarder, puis regénérer le PDF pour le client.
        </p>
        <div className="mt-4 space-y-4">
          {docs.map((doc) => (
            <AdminDocumentRow
              key={doc.id}
              documentId={doc.id}
              title={doc.title}
              userEmail={doc.user?.email ?? "—"}
              slug={doc.slug}
              fileName={doc.fileName}
              formDataJson={JSON.stringify(doc.formData, null, 2)}
            />
          ))}
          {docs.length === 0 ? (
            <p className="text-sm text-muted-foreground">Aucun document généré.</p>
          ) : null}
        </div>
      </section>

      <section className="rounded-lg border bg-muted/30 p-4 text-sm text-muted-foreground">
        <p className="font-medium text-foreground">Stripe — remboursements</p>
        <p className="mt-2">
          Dashboard Stripe → Paiements → Rembourser. En cas de contestation (chargeback),
          répondre sous 7 jours avec preuve de livraison du service (historique PDF, logs).
        </p>
      </section>
    </div>
  );
}
