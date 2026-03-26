export async function fetchGithubRepoInfo(owner, repo) {
  const baseUrl = import.meta.env.DEV ? '/api' : 'https://api.kratiuk.me';
  const endpoint = `${baseUrl}/${repo}/github/repo-info`;
  const repoRes = await fetch(endpoint);
  const repoData = await repoRes.json();
  return {
    owner,
    repo,
    stars: repoData.stars,
    forks: repoData.forks,
    tag: repoData.latestTag || '',
    loading: false
  };
}
