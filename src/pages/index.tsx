import Grid from "@mui/material/Grid";
import ProfileSection from "@/components/ProfileSection";
import FilterSection from "@/components/FilterSection";
export default function Home() {
  return (
    <div style={{ paddingTop: 60 }}>
      <Grid container>
        <Grid item xs={false} sm={1} />
        <Grid item xs={12} md={3}>
          <ProfileSection />
        </Grid>
        <Grid item xs={12} md={6}>
          <FilterSection />
        </Grid>
      </Grid>
    </div>
  );
}
