import java.util.Collections;
import java.util.HashSet;
import java.util.LinkedList;

/**
 * Represents a solved sudoku board
 * @author shaw
 *
 */
public class Board2 {

	private char[] symbols = {'0', '1', '2', '3', '4', '5', '6', '7','8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G'};

	
	//TODO: Make square cells and strange cells consistent
	private int cell;

	private int length;

	private char[][] grid;
	private int[][] regions;
	


	public static void main(String[] args){
		
		Board2 b = new Board2(5);

		//				System.out.println(b.checkGrid(new int[][]{{3,4,4,1},
		//						{2,1,2,3},
		//						{2,4,1,3},
		//						{1,3,4,2}}
		//						, true));


	}

	/**
	 * Constructor
	 * @param size The length of a cell
	 */
	public Board2(int size){
		


		System.out.println(toString(new int[][]{{3,4,4,1},
								{2,1,2,3},
								{2,4,1,3},
								{1,3,4,2}}));
		
		//		this.cell = size;
		//		this.length = cell * cell;

		this.length = size;
		this.cell = (int)Math.sqrt(length);
//		if (cell*cell != length){
//			//Not a perfect square
//			cell = -length;
//		}
		
		grid = new char[length][length];
		regions = makeStrangeRegions();
		
		System.out.println(toString(regions));
		
		generateBoard();

		System.out.println(this);

		//		System.out.println(checkGrid(grid,true));
	}

	public char[][] getGrid(){
		return grid;
	}

	public int[][] getRegions(){
		return regions;
	}

	public void generateBoard(){
		if (!fillGrid(grid, 0,0)){
			System.out.println("No valid board can be made");
		}

		//		convertBoard();

	}

	/**
	 * Tries to fill a grid in a way that follows the rules of sudoku
	 * @param grid
	 * @param r
	 * @param c
	 * @return Whether the attempt was successful
	 */
	private boolean fillGrid(char[][] grid, int r, int c){

		//		System.out.println("r: " + r + " c: " + c);

		if (!checkGrid(grid, false)){
			return false;
		}

		if (c >= length){
			c = 0;
			r++;
		}

		if (r >= length){
			if ( checkGrid(grid, true)){
				this.grid = grid;
				return true;
			} else {
				return false;
			}
		}

		LinkedList<Character> numbers = new LinkedList<Character>();
		for (int i = 1; i <= length; i++) {
			numbers.add(symbols[i]);
		}

		//A random order of numbers allows different boards to be made
		Collections.shuffle(numbers);

		char[][] newGrid = cloneArray(grid);

		while(!numbers.isEmpty()){

			char n = numbers.remove();
			newGrid[r][c] = n;

			if (fillGrid(newGrid,r,c+1)){
				return true;
			}


		}
		return false;
	}

	private boolean checkGrid(char[][] grid, boolean complete){

		if (complete){
			//Check for 0's
			for (int i = 0; i < grid.length; i++) {
				for (int j = 0; j < grid.length; j++) {
					if (grid[i][j] == 0)
						return false;
				}
			}
		}

		//Check rows and columns
		for (int i = 0; i < grid.length; i++) {

			if (!checkRegion(grid, i,0,1, length)){
				return false;
			}
			if (!checkRegion(grid, 0,i,length, 1)){
				return false;
			}

		}

		//Check cells
//		if (cell > 0){
//			if (!checkSquareRegion(grid)){
//				return false;
//			}
//		} else {
			if (!checkStrangeRegion(grid)){
				return false;
			}
//		}

		//		if (!checkStrangeRegion(grid)){
		//			return false;
		//		}
		//Check diagonals, maybe? NVM no valid solution


		return true;

	}

	private boolean checkSquareRegion(char[][] grid){

		for (int i = 0; i < cell; i++) {
			for (int j = 0; j < cell; j++) {				
				if (!checkRegion(grid, i*cell,j*cell,cell, cell)){
					return false;
				}
			}
		}
		return true;
	}
	
	private int[][] makeSquareRegions(){
		
		int[][] grid = new int[length][length];
		
		int section = 0;
		
		for (int i = 0; i < cell; i++) {
			for (int j = 0; j < cell; j++) {				
				
				for (int a = 0; a < cell; a++) {
					for (int b = 0; b < cell; b++) {
						grid[i*cell+a][j*cell+b] = symbols[section];
					}
				}
				section++;
			}
		}

		return grid;
		
	}

	private int[][] makeStrangeRegions(){

		if (cell*cell == length){
			return makeSquareRegions();
		}
		
		if (length <=4){
			System.out.println("Length invalid");
			return null;
		}

		int[][] grid = new int[length][length];

		grid = fillStrangeCorners(grid);
		
		System.out.println("g11"+grid[1][1] + toString(grid));

		int section = 5;		//'0' is a valid section
		int direction = 0; //up, down, left, right
		while (section < length){
			int count = 0;
			grid = fillStrangeSpaces(grid, section, direction);
			section++;
			direction++;
		}
		System.out.println(grid[1][2]);
		return grid;
	}

	private int[][] fillStrangeCorners(int[][] grid){
		int count = 0;
		for (int sum = 0; sum < length; sum++) {
			for (int a = 0; a <= sum; a++) {

				grid[0 + (sum-a)][0 + a] = 1;
				grid[0 + a][length-1 - (sum-a)] = 2;
				grid[length-1 - (sum-a)][length-1 - a] = 3;
				grid[length-1 - a][0 + (sum-a)] = 4;
				count++;
				if (count >= length){
					return grid;
				}
			}
		}

		return grid;
	}

	private int[][] fillStrangeSpaces(int[][] grid, int section, int direction){

		direction = direction % 4;

		int count = 0;
		for (int i = 0; i < grid.length; i++) {
			for (int j = 0; j < grid.length; j++) {
				int a,b;
				a=b=0;
				switch (direction){
				case 0:
					a = i; b = j; break;
				case 1:
					a = length-1-i; b = length-1-j; break;
				case 2:
					a = j; b = i; break;
				case 3:
					a = length-1-j; b = length-1-i; break;
				default:
					System.out.println("Direction error");
				}

				if (grid[a][b] == 0){
					grid[a][b] = section;
					count++;
					if (count >= length){
						return grid;
					}
				}
			}		
		}
		return grid;
	}


	private boolean checkStrangeRegion(char[][] grid){

		//		int[][] regions = makeStrangeRegions();

		HashSet<Character>[] digits = (HashSet<Character>[])new HashSet[length];
		for (int i = 0; i < digits.length; i++) {
			digits[i] = new HashSet<Character>();
		}

		for (int i = 0; i < length; i++) {
			for (int j = 0; j < length; j++) {

				if (regions[i][j] != 0){

					char n = grid[i][j];
					if (n != '0'){
						if (!digits[regions[i][j]].add(n)){
							return false;
						}
					}
				}

			}
		}

		return true;


	}

	private boolean checkRegion(char[][] grid, int x, int y, int dx, int dy){

		HashSet<Character> digits = new HashSet<Character>(length);

		for (int a = 0; a < dx; a++) {
			for (int b = 0; b < dy; b++) {				
				char n = grid[x + a][y + b];

				if (n > 0){
					if (! digits.add(n)){
						return false;
					} else if (n > length){
						return false;
					}
				}
			}
		}

		return true;
	}

	private char[][] toChar(int[][] grid){

		char[][] arr = new char[length][length];

		int change;
		if (length < 10){
			change = '0';
		} else {
			change = 'A';
		}

		for (int i = 0; i < grid.length; i++) {
			for (int j = 0; j < grid[0].length; j++) {
				arr[i][j] = (char) (grid[i][j] + change);
			}
		}

		return arr;
	}

	private char[][] cloneArray(char[][] grid2){

		char[][] newArr = new char[length][length];

		for (int i = 0; i < newArr.length; i++) {
			newArr[i] = grid2[i].clone();
		}

		return newArr;

	}

	public String toString(){
		return (toString(grid));
	}

	public String toString(char[][] arr) {
		String s = "";

		int stringLength = 0;

		for (int i = 0; i < grid.length; i++) {
			for (int j = 0; j < grid[0].length; j++) {

				if (j % cell == 0){
					s += "| ";
				}
				s += grid[i][j] + " ";

			}
			s += "| ";
			s += "\n";
			if (i==0){
				stringLength = s.length()-2;}

			if ((i+1) % cell == 0){
				for (int j = 0; j < stringLength; j++) {
					s += "-";
				}
				s += "\n";
			}

		}

		//Make a border at the top
		s = "\n" + s;
		for (int j = 0; j < stringLength; j++) {
			s = "-" + s;
		}
		s += "\n";

		return s;
	}
	
	public String toString(int[][] arr){

		char[][] grid = toChar(arr);

		return toString(grid);
	}

}
