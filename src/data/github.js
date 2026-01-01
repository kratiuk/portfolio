export async function fetchGithubRepoInfo(owner, repo) {
  const [repoRes, tagsRes] = await Promise.all([
    fetch(`https://api.github.com/repos/${owner}/${repo}`),
    fetch(`https://api.github.com/repos/${owner}/${repo}/tags?per_page=1`)
  ]);
  const repoData = await repoRes.json();
  const tagsData = await tagsRes.json();
  return {
    owner,
    repo,
    stars: repoData.stargazers_count,
    forks: repoData.forks_count,
    tag: Array.isArray(tagsData) && tagsData.length > 0 ? tagsData[0].name : '',
    loading: false
  };
}
